namespace DailyBonfireProject.Models
{
    public class UserContentDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ContentId { get; set; }
        public int? UserBoardId { get; set; }
        public string userDescription { get; set; }
        //public List<Keyword> Keywords { get; set; }
        public bool IsPublic { get; set; }
    }
}