namespace DailyBonfireProject.Models
{
    public class UserSubscribedTagsDto
    {
        public int Id { get; set; }
        public int TagId { get; set; }
        public int UserId { get; set; }
        public int Strength { get; set; }
    }
}