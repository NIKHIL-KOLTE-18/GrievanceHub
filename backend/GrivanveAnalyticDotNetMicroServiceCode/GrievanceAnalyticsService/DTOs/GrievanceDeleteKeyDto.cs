using System.Text.Json.Serialization;

public class GrievanceDeleteKeyDto
{
    [JsonPropertyName("studentId")]
    public int StudentId { get; set; }

    [JsonPropertyName("title")]
    public string Title { get; set; }

    // Date portion is enough for match since Java side uses LocalDate
    [JsonPropertyName("createdDate")]
    public DateTime CreatedDate { get; set; }
}


