namespace DailyBonfireProject.Models
{
    public class UserBoardsDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int BoardId { get; set; }
        public bool IsPublic { get; set; }
        //public List<Keyword> Keywords { get; set; }

    }
}