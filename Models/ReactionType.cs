using System.Collections.Generic;

namespace website.Models
{
    public class ReactionType
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string IconUrl { get; set; }
        public List<Reaction> Reactions { get; set; }
    }
}
