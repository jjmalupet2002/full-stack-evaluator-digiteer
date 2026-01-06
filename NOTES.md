# Implementation Notes

## Implemented Features
### Backend
- **Resilience**: Added `GlobalExceptionHandler` to catch all unhandled errors and return RFC 7807 Problem Details.
- **Robustness**: Refactored `TasksController` to use DTOs (`CreateTaskDto`, `UpdateTaskDto`) and validate input.
- **Data Integrity**: Implemented `GetOrCreateDefaultUserAsync` to ensure tasks are always assigned to a valid user.
- **Developer Experience**: Added `Database.EnsureCreated()` in `Program.cs` to automatically setup the database without manual migration steps (bypassing tooling issues).
- **Security**: Configured CORS to allow frontend access.

### Frontend
- **State Management**: Implemented `Redux Toolkit` for predictability.
- **Separation of Concerns**: created `useTasks` hook to abstract logic from UI components.
- **Error Handling**: Configured centralized Axios interceptors to log and handle API errors.
- **UX**: Added `TaskForm` component and instant feedback for task operations.

## Missing / Future Work
- **Authentication**: Currently using a "Default User". JWT Auth should be added next.
- **Testing**: Added unit tests for backend logic.
- **Optimistic UI**: Could be enhanced to rollback state if API fails (partially implemented via thunks).

## How to Run
1. **Backend**:
   ```bash
   cd backend
   dotnet run
   ```
   *Note: Database will be created automatically on first run.*

2. **Frontend**:
   ```bash
   npm run dev
   ```

## 🔧 Troubleshooting & Workarounds

### 1. .NET 9 SDK Installation
The project requires .NET 9. If the generic `dotnet` command points to an older version (check with `dotnet --version`), use the local installation:
```bash
/home/jj/.dotnet/dotnet run
```
Or add it to your PATH:
```bash
export PATH=$HOME/.dotnet:$PATH
```

### 2. Database Authentication
The default configuration expects a local PostgreSQL user `postgres` with password `password`.
If you encounter `28P01: password authentication failed`, reset the local password:
```bash
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'password';"
```

### 3. Database Connection
If the `.env` file is not picking up the connection string properly, we have explicitly set it in `appsettings.json`:
```json
"DefaultConnection": "Host=localhost;Database=taskmanager;Username=postgres;Password=password"
```

### 4. Database Migrations
Global tools like `dotnet-ef` may fail to install/run in some environments. We bypassed this by adding `db.Database.EnsureCreated()` in `Program.cs`, which creates the database schema automatically on startup if it doesn't exist.
