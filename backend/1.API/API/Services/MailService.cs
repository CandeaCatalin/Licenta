using System;
using MailKit.Net.Smtp;
using MimeKit;

namespace API.Services
{
    public class MailService
    {
        MimeMessage message = new MimeMessage();
        string emailAddress = "queuemanagementapp@gmail.com";
        string password = "CatalinCandea1";
        SmtpClient client = new SmtpClient();

        public string sendEmail(string toEmail, string body, string subject)
        {
            message.From.Add(new MailboxAddress("Queue Management Support", "queuemanagementapp@gmail.com"));
            message.To.Add(MailboxAddress.Parse(toEmail));
            message.Subject = subject;
            message.Body = new TextPart("plain")
            {
                Text = body
            };
            try
            {
                client.Connect("smtp.gmail.com", 465, true);
                client.Authenticate(emailAddress, password);
                client.Send(message);
                return ("Mail sent!");
            }
            catch (Exception ex)
            {
                return (ex.Message);
            }
            finally
            {
                client.Disconnect(true);
                client.Dispose();
            }
        }
    }
}
