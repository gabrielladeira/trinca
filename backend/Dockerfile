FROM microsoft/dotnet:2.2-sdk AS build-env
WORKDIR /app

COPY Application/TrincaBarbecueApi.Application.csproj ./Application/TrincaBarbecueApi.Application.csproj
COPY Domain/TrincaBarbecueApi.Domain.csproj ./Domain/TrincaBarbecueApi.Domain.csproj 
COPY Service/TrincaBarbecueApi.Service.csproj ./Service/TrincaBarbecueApi.Service.csproj 
COPY Data/TrincaBarbecueApi.Data.csproj ./Data/TrincaBarbecueApi.Data.csproj 

RUN dotnet restore Application/TrincaBarbecueApi.Application.csproj 

COPY . ./
RUN dotnet publish Application/TrincaBarbecueApi.Application.csproj -c Release -o out

FROM microsoft/dotnet:2.2-aspnetcore-runtime
WORKDIR /app
COPY --from=build-env /app/Application/out .
ENTRYPOINT ["dotnet", "TrincaBarbecueApi.Application.dll"]
