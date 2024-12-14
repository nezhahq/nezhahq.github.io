---
outline: deep
---

# API Documentation

Nezha Dashboard provides a comprehensive API documentation that allows developers to create custom applications, such as custom frontends or bots, leveraging its APIs.

---

## Instructions

### Fetching and Generating Documentation

1. **Clone the Repository**  
   Clone the official repository:  
   ```bash
   git clone https://github.com/nezhahq/nezha.git
   cd nezha
   ```

2. **Run the Bootstrap Script**  
   Execute the following script to generate files required for API documentation:  
   ```bash
   ./script/bootstrap.sh
   ```

3. **Compile the Code**  
   If the compilation process reports missing `admin-dist` or `user-dist` directories, create empty directories as follows:  
   ```bash
   mkdir -p dashboard/admin-dist dashboard/user-dist
   ```

4. **Enable Debug Mode**  
   Update the configuration to enable Debug mode and run `dashboard`  
   The system logs will automatically display the URL for accessing the API documentation.

