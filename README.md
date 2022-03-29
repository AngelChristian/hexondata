# HexonData - CRUD API using nodejs,express,postgres

### DATABASE (postgres):
#### Following tables are designed:
#### Drivers
![example](https://res.cloudinary.com/dzvlq0hzb/image/upload/v1648593100/drivers_db_y7l0vw.png)
#### vehicles
![example](https://res.cloudinary.com/dzvlq0hzb/image/upload/v1648593100/vehicle_db_nbxbgu.png)
#### Routes
![example](https://res.cloudinary.com/dzvlq0hzb/image/upload/v1648593100/routes_db_nzsciz.png)
#### Trips
![example](https://res.cloudinary.com/dzvlq0hzb/image/upload/v1648593100/trips_db_ievwn8.png)

## APIs:
### ALL tables have common apis:
1) get ALL entries
2) get entry by ID
3) create new entry
4) update entry
5) delete entry

## sample JWT
#### every table's DELETE endpoints are secured with JWT using fake mock signin accepting username, password :admin and signout

### Example
#### without token
![example](https://res.cloudinary.com/dzvlq0hzb/image/upload/v1648593100/unauth_gtonp4.png)

#### with token
![example](https://res.cloudinary.com/dzvlq0hzb/image/upload/v1648593100/auth_a6t9cs.png)

### Running Server
npm start

## Author

[Angel Christian](https://github.com/AngelChristian)

