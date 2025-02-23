# IndiaPincodeAPI

AN API that retrieves different location parameters of the country of India based on pincode.  

## API Usage

### **Base URL**
```
http://localhost:3000
```


### **`GET /latitude&longitude`**
Retrieves a record by latitude and longitude of the place.

**Query params**: `lat`,`long` (required)

### **`GET /pincode`**
Retrieves a record by pincode.

**Query params**: `pin` (required)


### **`GET /office`**
Retrieves a list of offices by pincode.

**Query params**: `pin` (required)


### **`GET /location`**
Retrieves Google Maps URLs for offices by pincode and latitude.

**Query params**: `pin` (required)


### **`POST /office`**
Retrieves a record by office name.

**Request Body**: `{ "officename": "office_name" }`

