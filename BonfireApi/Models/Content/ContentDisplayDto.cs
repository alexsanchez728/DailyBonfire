namespace DailyBonfireProject.Models
{
    public class ContentDisplayDto
    {
        public int UserId { get; set; }
        public int ContentId { get; set; }
        public int UserBoardId { get; set; }
        public string UserName { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public string DescriptionFromUser { get; set; }
        public string WebsiteDescription { get; set; }
        public bool IsPublic { get; set; }
    }
}