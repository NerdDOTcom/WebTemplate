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
          switch(request.Path)
          {
            case "signup":
            {
              var(send_user,send_pass) = request.GetBody<(string,string)>();
              var w = database.Users.FirstOrDefault(r=> r.Username == send_user && r.Password == send_pass);
              if(w ==null)
              {
                response.Send("Bro did you just signup for a bullet hell game website?");
                database.Users.Add(new User(send_user,send_pass));
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
              var(send_user,send_pass) = request.GetBody<(string,string)>();
              var w = database.Users.FirstOrDefault(r=> r.Username == send_user && r.Password == send_pass);
              if(w ==null)
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
  public DbSet<Product> Products { get; set; } = default!;
}

class User(string username, string password)
{
  [Key] public int Id { get; set; } = default!;
  public string Username { get; set; } = username;
  public string Password { get; set; } = password;
}

class Catagory(string title)
{
  [Key] public int Id { get; set; } = default!;
  public string Title { get; set; } = title;
}

class Product(string name, int catagoryId)
{
  [Key] public int Id { get; set; } = default!;
  public string Name { get; set; } = name;

  public int CatagoryId { get; set; } = catagoryId;
  [ForeignKey("CatagoryId")] public Catagory Catagory { get; set; } = default!;
}