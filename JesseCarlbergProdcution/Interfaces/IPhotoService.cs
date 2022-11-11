using System;
using Microsoft.AspNetCore.Mvc;

namespace JesseCarlbergProdcution.Interfaces
{
    public interface IPhotoService
    {
        public Task<List<string>> GetThumbNailsAsync();
        public Task<List<string>> GetImagesAsync();
        public Task<List<string>> GetPhotoShootAsync(string photoShoot);
        public Task<IActionResult> Upload(ICollection<IFormFile> files, string imgLibrary);
        public Task<IActionResult> UploadToPhotoSession(ICollection<IFormFile> files, string photoSession);

    }
}