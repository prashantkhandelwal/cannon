using Asp.Versioning;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

string env = (builder.Environment.IsDevelopment()) ? string.Empty : ".Production";
builder.Configuration.AddJsonFile($"appsettings{env}.json", optional: false, reloadOnChange: true);
builder.Configuration.AddEnvironmentVariables();

builder.Services.AddRouting((options) => options.LowercaseUrls = true);
builder.Services.AddControllers();
builder.Services.AddApiVersioning((v) =>
{
    v.DefaultApiVersion = new ApiVersion(1, 0);
    v.AssumeDefaultVersionWhenUnspecified = true;
    v.ReportApiVersions = true;
    //v.ApiVersionReader = new HeaderApiVersionReader("x-api-version");

});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
app.UseSwagger();
app.UseSwaggerUI();
//}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
