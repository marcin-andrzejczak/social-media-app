namespace website.Models
{
    public class Reaction
    {
        public int UserID { get; set; }
        public int EntryID { get; set; }
        public ReactionType ReactionType { get; set; }
    }
}
