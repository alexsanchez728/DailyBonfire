namespace DailyBonfireProject.Models.Tags
{
    public class ContentTagsDto
    {
        public int Id { get; set; }
        public int TagId { get; set; }
        public int ContentId { get; set; }
        public int Strength { get; set; }
    }
}