using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Microsoft.EntityFrameworkCore;

class Program
{
  static void Main()
  {
    bool p = false;
    string[] mn = [];
    string[] tf = [];
    string[] username = [];
    string[] email = [];
    string[] id = [];
    int[] scores = [];
    int port = 5000;
    Server server = new Server(port);

    Console.WriteLine("The server is running");
    Console.WriteLine($"Main Page: http://localhost:{port}/website/pages/index.html");
    while (true)
    {

      (var request, var response) = server.WaitForRequest();

      Console.WriteLine("request: " + request.Path);
      if (File.Exists(request.Path))
      {
        var file = new File(request.Path);
        response.Send(file);
      }
      else if (request.ExpectsHtml())
      {
        var file = new File("website/pages/404.html");
        response.SetStatusCode(404);
        response.Send(file);
      }
      else
      {
        try
        {
          if (request.Path == "m")
          {
            (string text, string urid) = request.GetBody<(string, string)>();
            for (int i = 0; i < id.Length; ++i)
            {
              if (urid == id[i])
              {
                mn[i] = username[i];
                tf[i] = text;
                response.Send((mn, tf));
              }
            }
            Console.WriteLine("Got m '" + text + "' from dude");
          }
          else if (request.Path == "in")
          {
            string urid = "";
            p = false;
            for (int i = 0; i < username.Length; ++i)
            {
              Console.WriteLine(username[i] + ", " + email[i]);
              (string h, string hh) = request.GetBody<(string, string)>();
              if (h == username[i] && hh == email[i])
              {
                p = true;
                urid = id[i];
                response.Send((p, urid));
              }
            }
            if (!p)
            {
              response.Send((p, urid));
            }
          }
          else if (request.Path == "si")
          {
            (string uni, string ei) = request.GetBody<(string, string)>();
            username = [.. username, uni];
            email = [.. email, ei];
            scores = [.. scores, 0];
            id = [.. id, Guid.NewGuid().ToString()];
            Console.WriteLine("Got:" + uni + ei);
            response.Send("succsefully signed in");
          }
          else if (request.Path == "gun")
          {
            string urid = request.GetBody<string>();
            for (int i = 0; i < id.Length; ++i)
            {
              if (id[i] == urid)
              {
                response.Send(username[i]);
              }
            }
          }
          else if (request.Path == "sco")
          {
            (string urid, int score) = request.GetBody<(string, int)>();
            for (int i = 0; i < id.Length; ++i)
            {
              if (id[i] == urid)
              {
                scores[i] += score;
                response.Send(scores[i]);
              }
            }
          }
          else if(request.Path == "tempsco")
          {
            (string urid, int score) = request.GetBody<(string, int)>();
            for (int i = 0; i < id.Length; ++i)
            {
              if (id[i] == urid)
              {
                scores[i] += 1;
                response.Send(scores[i]);
              }
            }
          }
        }
        catch (Exception exception)
        {
          Log.WriteException(exception);
        }
      }
      response.Close();
    }

  }
}


