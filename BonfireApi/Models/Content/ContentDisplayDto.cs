namespace DailyBonfireProject.Models
{
    public class ContentDisplayDto
    {
        public int UserId { get; set; }
        public int ContentId { get; set; }
        public int Id { get; set; }
        public int? UserBoardId { get; set; }
        public int BoardId { get; set; }
        public string UserName { get; set; }
        public string BoardTitle { get; set; }
        public string ContentTitle { get; set; }
        public string Url { get; set; }
        public string userDescription { get; set; }
        public string WebsiteDescription { get; set; }
        public bool IsPublic { get; set; }
    }
}