using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DailyBonfireProject.Models
{
    public class BoardsDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string DescriptionFromUser { get; set; }
    }
}