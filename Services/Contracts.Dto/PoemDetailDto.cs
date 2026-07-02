namespace Contracts.Dto
{
    public class PoemDetailDto
    {
        public Guid PoemId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public List<string> Lines { get; set; } = new();
        public string IllustrationPath { get; set; } = string.Empty;
    }
}
