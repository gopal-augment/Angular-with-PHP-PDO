# Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

This project is just for code structure and beginners for Angular 5
All you need is nodejs should installed on your machine.
Clone this git into your local

For Example:
Assume If you clone into D:/xampp/htdocs/
open node js command prompt

1. npm install

Then open angular1/.htaccess, replace the ip address "172.16.2.23" with your local/server IP address
And open angular1/src/app/globalConfig.ts, replace the ip address "172.16.2.23" with your local/server IP address
Create database 'myprojectangular' and Import sample SQL in your server from angular1/dbfile/myprojectangular.sql

2. Run your application with ng serve --host=0.0.0.0

3. Open site in your browser like http://ip-address:4200/


**Issue in deploy the Project in Ubuntu Platform**
If you are using Angular version > 5, then run
```
npm update
```
If you getting further error like PHP CORS, do/check the following steps
```
/etc/apache2/apache2.conf file.
<Directory /var/www/>
	Options Indexes FollowSymLinks
	AllowOverride None => change to All
	Require all granted
</Directory>
```
```
sudo a2enmod rewrite
sudo a2enmod headers
```
```
sudo service apache2 restart
```
To test PDO connection in command prompt since this project using PHP with Mysql-PDO connection
```
php -r "new PDO('mysql:host=127.0.0.1;dbname=db_php', 'root', '');"
```
