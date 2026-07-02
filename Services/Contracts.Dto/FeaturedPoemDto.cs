namespace Contracts.Dto
{
    public class FeaturedPoemDto
    {
        public Guid PoemId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string IllustrationPath { get; set; } = string.Empty;
        public int FeaturedOrder { get; set; }
    }
}
