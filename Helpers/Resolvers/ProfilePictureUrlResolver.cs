using AutoMapper;
using System;
using website.DTOs;
using website.Models;

namespace Website.Helpers.Resolvers
{
    public class ProfilePictureUrlResolver : IValueResolver<User, UserDto, String>
    {
        public string Resolve(User source, UserDto destination, string destMember, ResolutionContext context)
        {
            return source.ProfilePicture?.Url ?? "/images/default_avatar.png";
        }
    }
}
