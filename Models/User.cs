using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace website.Models
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<Media> Medias { get; set; }
        public Media ProfilePicture { get; set; }
        public List<Post> Posts { get; set; }
        public List<Comment> Comments { get; set; }
        public List<Reaction> Reactions { get; set; }
    }
}
