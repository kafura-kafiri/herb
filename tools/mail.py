# Import smtplib for the actual sending function
import smtplib

# Import the email modules we'll need
from email.mime.text import MIMEText


def simple_send(subject, text, you='kafura.kafiri@gmail.com', me='sharifinezhad1@gmail.com'):
    # me == the sender's email address
    # you == the recipient's email address
    msg = MIMEText(text)
    msg['Subject'] = subject
    msg['From'] = me
    msg['To'] = you

    # Send the message via our own SMTP server, but don't include the
    # envelope header.
    s = smtplib.SMTP('localhost')
    s.sendmail(me, [you], msg.as_string())
    s.quit()


def _send():
    import smtplib, email, email.encoders, email.mime.text, email.mime.base

    smtpserver = 'email@site.com'
    to = ['address@gmail.com']
    fromAddr = 'email@site.com'
    subject = "testing email attachments"

    # create html email
    html = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" '
    html += '"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml">'
    html += '<body style="font-size:12px;font-family:Verdana"><p>...</p>'
    html += "</body></html>"
    emailMsg = email.MIMEMultipart.MIMEMultipart('text/csv')
    emailMsg['Subject'] = subject
    emailMsg['From'] = fromAddr
    emailMsg['To'] = ', '.join(to)
    emailMsg['Cc'] = ", ".join(cc)
    emailMsg.attach(email.mime.text.MIMEText(html, 'html'))

    # now attach the file
    fileMsg = email.mime.base.MIMEBase('text/csv')
    fileMsg.set_payload(file('rsvps.csv').read())
    email.encoders.encode_base64(fileMsg)
    fileMsg.add_header('Content-Disposition', 'attachment;filename=rsvps.csv')
    emailMsg.attach(fileMsg)

    # send email
    server = smtplib.SMTP(smtpserver)
    server.sendmail(fromAddr, to, emailMsg.as_string())
    server.quit()


if __name__ == '__main__':
    simple_send('hi', 'hi huli huli')
