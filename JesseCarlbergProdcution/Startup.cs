using System;
using JesseCarlbergProdcution.Interfaces;
using JesseCarlbergProdcution.Services;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Reflection;
using JesseCarlbergProdcution.Models;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using MongoDB.Driver;

namespace JesseCarlbergProdcution
{
    /// <summary>
    /// Class Startup.
    /// </summary>
    public class Startup
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Startup" /> class.
        /// </summary>
        /// <param name="configuration">The configuration.</param>
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        /// <summary>
        /// Gets the configuration.
        /// </summary>
        /// <value>The configuration.</value>
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        /// <summary>
        /// Configures the services.
        /// </summary>
        /// <param name="services">The services.</param>
        public void ConfigureServices(IServiceCollection services)
        {

            // TODO: May not need this
            services.AddHttpContextAccessor();

            // Health Check
            services.AddHealthChecks();

            
            // Configure the application to use the protocol and client ip address forwared by the frontend load balancer
            services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.ForwardedHeaders =
                    ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
                // Only loopback proxies are allowed by default. Clear that restriction to enable this explicit configuration.
                options.KnownNetworks.Clear();
                options.KnownProxies.Clear();
            });

            services.AddSingleton<IMongoClient, MongoClient>();

            // Configure the application to client certificate forwarded the frontend load balancer
            services.AddCertificateForwarding(options => { options.CertificateHeader = "X-ARR-ClientCert"; });
       
            services.AddTransient<IEmailService, EmailService>();
            services.Configure<AuthMessageSenderOptions>(Configuration);

            services.Configure<AuthMessageSenderOptions>(
            Configuration.GetSection(nameof(AuthMessageSenderOptions)));
            services.AddSingleton<EmailService>();

            services.AddTransient<ITwitterService, TwitterService>();
            services.Configure<TwitterConnectionSettings>(
            Configuration.GetSection(nameof(TwitterConnectionSettings)));

            // Adding in Blog Service with Connection Strings
            services.Configure<BlogDBSettingsModel>(
                Configuration.GetSection(nameof(BlogDBSettingsModel)));


            services.AddTransient<IBlogService, BlogService>();

            services.AddSingleton<IBlogDBSettingsModel>(sp =>
                sp.GetRequiredService<IOptions<BlogDBSettingsModel>>().Value);


            // Adding in Contact Me Service with Connection Strings
            services.Configure<ContactDBSettingsModel>(
                Configuration.GetSection(nameof(ContactDBSettingsModel)));

            services.AddSingleton<IContactDBSettingsModel>(sp =>
                sp.GetRequiredService<IOptions<ContactDBSettingsModel>>().Value);

            services.AddTransient<IContactService, ContactService>();

            services.AddSingleton<ContactService>();

            // Adding in Blog Subscription Service with Connection Strings
            services.Configure<SubscriptionDBSettingsModel>(
                Configuration.GetSection(nameof(SubscriptionDBSettingsModel)));

            services.AddSingleton<ISubscriptionDBSettingsModel>(sp =>
                sp.GetRequiredService<IOptions<SubscriptionDBSettingsModel>>().Value);

            services.AddTransient<ISubscriptionsService, SubscriptionsService>();

            // Adding in AZ Image Service with Connection Strings
            services.Configure<AzureStorageConfig>(
                Configuration.GetSection(nameof(AzureStorageConfig)));

            services.AddSingleton<IAzureStorageConfig>(sp =>
                sp.GetRequiredService<IOptions<AzureStorageConfig>>().Value);

            services.AddTransient<IPhotoService, PhotoService>();

            services.AddTransient<IGAAnalyticsService, GAAnalyticsService>();



            services.AddControllers()
          .AddJsonOptions(opts => opts.JsonSerializerOptions.PropertyNamingPolicy = null);

            // Adding CORS
            services.AddCors(options =>
            {
                options.AddPolicy("CorsApi",
                    builder => builder.WithOrigins(
                        "https://localhost:44351",
                        "https://localhost:44304",
                        "https://jessecarlbergproduction.com/",
                        "https://jesserules.azurewebsites.net/"
                        )
               .AllowAnyMethod()
                       .AllowCredentials()
                       .WithMethods("POST", "DELETE", "GET", "HEAD"));
            });

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist/";
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Jesse Carlberg Production",
                    Version = "v1",
                    Description = "Personal Developer Site",
                    Contact = new OpenApiContact
                    {
                        Name = "Jesse Carlberg Production",
                        Email = "jesse@jessecarlbergproduction.com",
                        // Url = new Uri("http://localhost:5000"),
                    },
                });
            });

            services.AddApplicationInsightsTelemetry();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// <summary>
        /// Configures the specified application.
        /// </summary>
        /// <param name="app">The application.</param>
        /// <param name="env">The env.</param>
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            app.UseRouting();
            // Needs to come after app.UseAuthentication
            app.UseCookiePolicy();
            // Adding Cors
            app.UseCors("CorsApi");
            // app.UseMiddleware<AntiforgeryService>();

            //Load Swagger
            if (!env.IsProduction())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "AHAAPI v1"));
            }

            app.UseStaticFiles();

            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
                app.UseHsts();
            }

            // Certificate Validation
            app.UseForwardedHeaders();
            app.UseCertificateForwarding();
            app.UseHttpsRedirection();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                // Healthcheck endpoint for Azure
                endpoints.MapHealthChecks("/health");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    // Live reload not working for .net5 and ng11 for now,
                    // see https://github.com/dotnet/aspnetcore/issues/29478
                    spa.UseAngularCliServer(npmScript: "start");
                    spa.Options.StartupTimeout = TimeSpan.FromSeconds(180); // Increase the timeout if angular app is taking longer to startup
                    //spa.UseProxyToSpaDevelopmentServer("http://localhost:4200"); // Use this instead to use the angular cli server
                }
            });
        }
    }
}

