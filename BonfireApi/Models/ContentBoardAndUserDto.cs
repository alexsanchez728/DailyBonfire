using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DailyBonfireProject.Models
{
    public class ContentBoardAndUserDto
    {
        public string ContentName { get; set; }
        public string ContentSiteDescription { get; set; }
        public string ContentUrl { get; set; }
        public string ContentUserDescription { get; set; }
        public string UserName { get; set; }
        public string Bio { get; set; }
        public DateTime JoinDate { get; set; }
    }
}