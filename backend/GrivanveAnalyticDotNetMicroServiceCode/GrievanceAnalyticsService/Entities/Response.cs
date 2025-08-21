//This response entity used for any API response: success / error + message + optional data
//Generic class (T)allows any type of Data to be returned (e.g.list of stats, single object, etc.)

namespace GrievanceAnalyticsService.Entities
{
    public class Response<T>
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }

        public Response(bool success, string message, T data)
        {
            Success = success;
            Message = message;
            Data = data;
        }
    }
}
