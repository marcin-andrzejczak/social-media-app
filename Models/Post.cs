using System.Collections.Generic;

namespace website.Models
{
    public class Post : Entry
    {
        public List<Media> Medias { get; set; }
        public List<Comment> Comments { get; set; }
    }
}
