using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DailyBonfireProject.Models
{
    public class UsersDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Bio { get; set; }
        public DateTime JoinDate { get; set; }
    }
}