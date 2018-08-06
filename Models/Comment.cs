using System.Collections.Generic;

namespace website.Models
{
    public class Comment : Entry
    {
        public Post Post { get; set; }
    }
}
