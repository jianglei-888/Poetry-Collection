namespace Contracts.Domain.Database;

public class Poem : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public List<string> Lines { get; set; } = new();
    public string IllustrationPath { get; set; } = string.Empty;
    public bool IsFeaturedOnHome { get; set; }
    public int FeaturedOrder { get; set; }
}
