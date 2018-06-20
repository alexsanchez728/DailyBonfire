namespace DailyBonfireProject.Models
{
    public class BoardDisplayDto
    {
        public int Id { get; set; }
        public int BoardId { get; set; }
        public string UserName { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public string DescriptionFromUser { get; set; }
        public bool IsPublic { get; set; }
    }
}