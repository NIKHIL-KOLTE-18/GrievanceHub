using System.Text.Json.Serialization;

public class Grievance
{
    public Grievance()
    {
        CreatedDate = DateTime.Now; // fallback to avoid SqlDateTime overflow
    }

    [JsonPropertyName("id")]
    public long Id { get; set; }



    [JsonPropertyName("studentId")]
    public int StudentId { get; set; }

    [JsonPropertyName("categoryId")]
    public int CategoryId { get; set; }

    [JsonPropertyName("title")]
    public string Title { get; set; }

    [JsonPropertyName("status")]
    public string Status { get; set; }

    [JsonPropertyName("description")]
    public string? Description { get; set; }

    [JsonPropertyName("createdDate")]
    public DateTime CreatedDate { get; set; }
}
