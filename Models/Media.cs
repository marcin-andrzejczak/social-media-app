namespace website.Models
{
    public class Media
    {
        public int Id { get; set; }
        public User User { get; set; }
        public string Url { get; set; }
        public Post Post { get; set; }
    }
}
