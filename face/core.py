from imutils import face_utils
import imutils
import dlib
import cv2
import math
import numpy as np
from skimage.filters import hessian as hessian_filter, frangi as frangi_filter
import os

detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor(os.path.dirname(os.path.realpath(__file__)) + '/predictor.dat')

face_index = 0


def area(polygon):
    x, y = polygon[:, 0], polygon[:, 1]
    return 0.5 * np.abs(np.dot(x, np.roll(y, 1)) - np.dot(y, np.roll(x, 1)))


def clue(image, rect, shape, part=None):
    global face_index
    (x, y, w, h) = face_utils.rect_to_bb(rect)
    cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)

    # show the face number
    cv2.putText(image, "Face #{}".format(face_index), (x - 10, y - 10),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
    face_index += 1
    head, tail = 0, len(shape)
    if part:
        head, tail = face_utils.FACIAL_LANDMARKS_IDXS[part]
    for i, (x, y) in enumerate(shape[head: tail]):
        cv2.putText(image, "{}".format(i), (x, y),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.25, (0, 255, 0), 1)
        cv2.circle(image, (x, y), 1, (0, 0, 255), -1)
    return image


def highlight(image, polygon, color_option=0, alpha=0.75):
    overlay = image.copy()
    output = image.copy()

    colors = [(19, 199, 109), (79, 76, 240), (230, 159, 23),
              (168, 100, 168), (158, 163, 32),
              (163, 38, 32), (180, 42, 220)]

    # (j, k) = face_utils.FACIAL_LANDMARKS_IDXS['mouth']
    # polygon = cv2.convexHull(polygon)
    cv2.drawContours(overlay, [polygon], -1, colors[color_option], -1)
    cv2.addWeighted(overlay, alpha, output, 1 - alpha, 0, output)
    return output


def skin(polygon):
    # base = polygon[8]
    left = polygon[0]
    right = polygon[16]
    theta = math.atan((right[1] - left[1]) / (right[0] - left[0]))
    c, s = np.cos(theta), np.sin(theta)
    R = np.array([[c, s], [-s, c]])
    rotated = [R.dot(p) for p in polygon]
    forehead = [np.array([p[0], 1.5 * rotated[0][1] - p[1] * .5]) for p in reversed(rotated[1: 16])]
    d = np.array([0, np.linalg.norm(rotated[39] - rotated[36]) / 1.6])
    left_border = [rotated[39] + d, rotated[40] + d, rotated[41] + d, rotated[36] + d]

    d = np.array([0, np.linalg.norm(rotated[45] - rotated[42]) / 1.6])
    right_border = [rotated[45] + d, rotated[46] + d, rotated[47] + d, rotated[42] + d]

    rotated = rotated[: 48] + right_border + rotated[48:]
    rotated = rotated[: 42] + left_border + rotated[42:]
    rotated = rotated[: 17] + forehead + rotated[17:]

    reR = np.array([[c, -s], [s, c]])
    rotated = [reR.dot(p) for p in rotated]
    rotated = np.around(rotated).astype(int)
    polygon = rotated
    forehead = polygon[17: 42]
    left_cheek = np.concatenate((polygon[1: 9], polygon[80: 83], polygon[71: 75], polygon[48: 45: -1], polygon[57: 61]), axis=0)
    right_cheek = np.concatenate((polygon[8: 16], polygon[67: 71], polygon[50: 47: -1], polygon[74: 81]), axis=0)
    left_eye = np.concatenate((polygon[1: 2], polygon[32: 37], polygon[42: 43], polygon[57: 61]), axis=0)
    right_eye = np.concatenate((polygon[15: 16], polygon[41: 36: -1], polygon[42: 43], polygon[70: 66: -1]), axis=0)

    return polygon, forehead, left_eye, right_eye, left_cheek, right_cheek


def crop(image, polygon, out=False):
    polygon = polygon.reshape(1, *polygon.shape)
    if out:
        mask = np.ones((image.shape[0], image.shape[1]), dtype=np.uint8) * 255
        cv2.fillPoly(mask, polygon, (0,))
        res = cv2.bitwise_and(image, image, mask=mask)
        return res
    mask = np.zeros((image.shape[0], image.shape[1]), dtype=np.uint8)
    cv2.fillPoly(mask, polygon, (255, ))
    res = cv2.bitwise_and(image, image, mask=mask)
    rect = cv2.boundingRect(polygon)  # returns (x,y,w,h) of the rect
    cropped = res[rect[1]: rect[1] + rect[3], rect[0]: rect[0] + rect[2]]
    return cropped


def mouth(image, shape, colors=None, alpha=0.75):
    #              2     3     4
    #      1                         5
    #          13        14       15
    #  0 12                            16 6
    #          19                 17
    #   11               18              7
    #        10                       8
    #                    9
    overlay = image.copy()
    output = image.copy()

    if colors is None:
        colors = [(19, 199, 109), (79, 76, 240), (230, 159, 23),
                  (168, 100, 168), (158, 163, 32),
                  (163, 38, 32), (180, 42, 220)]

    base = face_utils.FACIAL_LANDMARKS_IDXS['mouth'][0]
    outer = shape[base: base + 12]
    inner = shape[base + 12: base + 20]
    cv2.drawContours(overlay, [outer], -1, colors[0], -1)
    cv2.drawContours(overlay, [inner], -1, colors[1], -1)

    # apply the transparent overlay
    cv2.addWeighted(overlay, alpha, output, 1 - alpha, 0, output)

    # return the output image
    mouth_area = area(outer) - area(inner)
    dist = np.linalg.norm(outer[0] - outer[6])
    top, bottom, left, right = np.amin(outer[:, 1]), np.amax(outer[:, 1]), np.amin(outer[:, 0]), np.amax(outer[:, 0])
    k = int(dist / 2)
    return output[max(0, top - k): min(image.shape[0], bottom + k),max(0, left - k): min(image.shape[1], right + k)], mouth_area, dist


def load(image, width=700):
    if image is str:
        image = cv2.imread(image)
        image = imutils.resize(image, width=width)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    faces = detector(gray, 1)
    return image, [(face_utils.shape_to_np(predictor(gray, rect)), rect) for rect in faces]


def analyse(f):
    img, shapes = load(f, width=512)
    # just the first one

    for i, (shape, rect) in enumerate(shapes[: 1]):
        # lips, image

        # img = clue(img, rect, shape)
        lips, lips_area, smile = mouth(img, shape)

        # cv2.imshow("{}".format(i), lips)
        extended, *regions = skin(shape)
        face_area = area(extended[0: 32])
        # img = clue(img, rect, extended)
        smile /= face_area ** .5

        # dominant and number
        from face.dominant import dominant
        bar, dominants = dominant(img, extended)
        whiteness = dominants[0][1][2] / dominants[0][1][1]
        # cv2.imshow("bar", bar)

        # wrinkles, and frangi img
        s = 0
        for j, region in enumerate(regions):
            cropped = crop(img, region)
            gray = cv2.cvtColor(cropped, cv2.COLOR_BGR2GRAY)
            hessian = hessian_filter(gray)
            # hessian = (255 - hessian * 255)
            frangi = frangi_filter(gray) * 128 * 256 * 64 * 8
            # flat = frangi.reshape((frangi.shape[0] * frangi.shape[1]))
            s += np.sum(frangi) / 255
            # cv2.imshow("{}".format(j * 2 + 1), frangi)
        face = cv2.cvtColor(crop(img, extended[0: 32]), cv2.COLOR_BGR2GRAY)
        for j, region in enumerate(regions):
            img = highlight(img, region, j)
        # cv2.imshow("img", frangi_filter(face) * 128 * 256 * 64 * 8)
        # cv2.waitKey()
        return (lips, lips_area / face_area / smile ** .4), (bar, whiteness), \
               (hessian_filter(face) * 255, frangi_filter(face) * 128 * 256 * 64 * 8, s / face_area), img


if __name__ == '__main__':
    analyse('faces/sb.jpg')
