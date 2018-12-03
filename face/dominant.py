from sklearn.cluster import KMeans
import numpy as np
import cv2
from face.core import crop


def centroid_histogram(clt):
    numLabels = np.arange(0, len(np.unique(clt.labels_)) + 1)
    (hist, _) = np.histogram(clt.labels_, bins=numLabels)

    # normalize the histogram, such that it sums to one
    hist = hist.astype("float")
    hist /= hist.sum()

    # return the histogram
    return hist


def plot_colors(hist, centroids):
    # initialize the bar chart representing the relative frequency
    # of each of the colors
    bar = np.zeros((50, 300, 3), dtype="uint8")
    startX = 0

    # loop over the percentage of each cluster and the color of
    # each cluster
    sort = sorted(zip(hist, centroids), key=lambda x: -x[0])
    for (percent, color) in sort:
        # plot the relative percentage of each cluster
        endX = startX + (percent * 300)
        cv2.rectangle(bar, (int(startX), 0), (int(endX), 50),
                      color.astype("uint8").tolist(), -1)
        startX = endX

    # return the bar chart
    return bar, sort


def dominant(image, polygon):
    # load the image and convert it from BGR to RGB so that
    # we can dispaly it with matplotlib
    # image = cv2.imread('faces/brad.jpg')
    # image = imutils.resize(image, width=512)
    # image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = crop(image, polygon[0: 32])
    image = image.reshape((image.shape[0] * image.shape[1], 3))
    import time
    # print(len(image))
    # nn = time.time()
    image = [pixel for pixel in image if pixel.any()]

    # cluster the pixel intensities
    clt = KMeans(n_clusters = 5)
    clt.fit(image)

    # build a histogram of clusters and then create a figure
    # representing the number of pixels labeled to each color
    hist = centroid_histogram(clt)
    bar = plot_colors(hist, clt.cluster_centers_)
    return bar
    # show our color bart
    # plt.figure()
    # plt.axis("off")
    # plt.imshow(bar)
    # plt.show()
