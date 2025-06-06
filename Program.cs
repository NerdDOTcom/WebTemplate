﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Numerics;
using System.Runtime.InteropServices.Marshalling;
using Microsoft.EntityFrameworkCore;

class Program
{
  static void Main()
  {
    int port = 5000;

    var server = new Server(port);

    Console.WriteLine("The server is running");
    Console.WriteLine($"Main Page: http://localhost:{port}/website/pages/index.html");

    var database = new Database();




    while (true)
    {
      (var request, var response) = server.WaitForRequest();

      Console.WriteLine($"Recieved a request with the path: {request.Path}");

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
          /*──────────────────────────────────╮
          │ Handle your custome requests here │
          ╰──────────────────────────────────*/
          switch (request.Path)
          {
            case "signup":
              {
                var (send_user, send_pass) = request.GetBody<(string, string)>();
                var w = database.Users.FirstOrDefault(r => r.Username == send_user && r.Password == send_pass);
                if (w == null)
                {
                  response.Send("Bro did you just signup for a bullet hell game website?");
                  database.Users.Add(new User(Guid.NewGuid().ToString(), send_user, send_pass));
                }
                else
                {
                  response.Send("this user already exists, ngl, I ain't giving you the joy of doing this auto, go click the login button and suffer");
                }
                // check if user doesn't exist 
                //if yes
                //add user to data base
                //else 
                //return failed 

                break;
              }
            case "login":
              {
                var (send_user, send_pass) = request.GetBody<(string, string)>();
                var w = database.Users.FirstOrDefault(r => r.Username == send_user && r.Password == send_pass);
                if (w == null)
                {
                  response.Send("empty");
                }
                else
                {
                  response.Send(w.Id);
                }
                //create a case for pulling out settings and putting in settings.
                break;
              }
            case "push_score":
              {
                var (score, user_id) = request.GetBody<(int, string)>();
                Console.WriteLine(user_id);
                database.score_boards.Add(new score_board(score, user_id));
                break;
              }
            case "get_scores":
              {
                var g = database.score_boards.OrderByDescending(r => r.Score);
                var w = g.Select(r => r.Score).ToArray();
                var z = g.Select(r => r.Userid).ToArray();
                response.Send(new { scores = w, userids = z });
                break;
              }
            case "username":
              {
                var userid  = request.GetBody<string>();
                var the_user = database.Users.FirstOrDefault(r => r.Id == userid)!;
                
                response.Send(the_user.Username);
                break;
              }
          }
          database.SaveChanges();

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


class Database() : DbBase("database")
{
  /*──────────────────────────────╮
  │ Add your database tables here │
  ╰──────────────────────────────*/
  public DbSet<User> Users { get; set; } = default!;
  public DbSet<Catagory> Catagories { get; set; } = default!;
  public DbSet<score_board> score_boards { get; set; } = default!;
}

class User(string id, string username, string password)
{
  [Key] public string Id { get; set; } = id;
  public string Username { get; set; } = username;
  public string Password { get; set; } = password;
}

class Catagory(string title)
{
  [Key] public int Id { get; set; } = default!;
  public string Title { get; set; } = title;
}

class score_board(int score, string userid)
{
  [Key] public int Id { get; set; } = default!;
  public int Score { get; set; } = score;

  public string Userid { get; set; } = userid;
  [ForeignKey("Userid")] public User User { get; set; } = default!;
}