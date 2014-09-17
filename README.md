# AngularJS User Management Simple Application

## Overview
This application shows the list of users stored. 
Each of them can be edit or removed. 
Also you can add new users in this list by clicking the link and typing it's information in fields below.

За основу был взят пустой проект *seed* с github.
Сейчас вместо списка из 3 пользователей он генерирует список из почти 400 пустых. 
Вначале, список пользователей был в массиве внутри контроллера и отображался. Затем был перенесен в файл из которого при старте загружался, но не обновлялся при работе.
Непонятная мне сейчас проблема кроется где-то в '$http.(method)', видимо я неправильно работаю с *.json* файлом.
Контроллеры и сервис не стал в этой версии выносить в отдельные файлы, оставил все в одном как в исходнике.


## Application Directory Layout

    app/                --> all of the files to be used in production
      css/              --> css files
        app.css         --> default stylesheet
      img/              --> image files
      index.html        --> app layout file (the main html template file of the app)
      js/               --> javascript files
        app.js          --> the main application module
      partials/         --> angular view partials (partial html templates) used by ngRoute
        partial1.html
        partial2.html
	  users/			--> stored users data in *.json files
	    users.json		--> default file with users information
    
	bower_components  --> 3rd party js libraries, including angular and jquery

    scripts/            --> handy scripts
      update-repo.sh       --> pull down the latest version of this repos
                               (BE CAREFUL THIS DELETES ALL CHANGES YOU HAVE MADE)
      private/             --> private scripts used by the Angular Team to maintain this repo
    test/               --> test source files and libraries
      karma.conf.js        --> config file for running unit tests with Karma
      protractor-conf.js   --> config file for running e2e tests with Protractor
      e2e/
        scenarios.js       --> end-to-end specs (it's not working in this version)
      unit/             --> unit level specs/tests
        controllersSpec.js --> specs for controllers
        directivesSpec.js  --> specs for directives (not used)
        filtersSpec.js     --> specs for filters (not used)
        servicesSpec.js    --> specs for services

## Contact
Skype: foint_nn
e-mail: freezer.nik@gmail.com


For more information on AngularJS please check out http://angularjs.org/

[7 Zip]: http://www.7-zip.org/
[angular-seed]: https://github.com/angular/angular-seed
[DI]: http://docs.angularjs.org/guide/di
[directive]: http://docs.angularjs.org/guide/directive
[filterFilter]: http://docs.angularjs.org/api/ng/filter/filter
[git-home]: http://git-scm.com
[git-github]: http://help.github.com/set-up-git-redirect
[ngRepeat]: http://docs.angularjs.org/api/ng/directive/ngRepeat
[ngView]: http://docs.angularjs.org/api/ngRoute/directive/ngView
[node-download]: http://nodejs.org/download/
[$resource]: http://docs.angularjs.org/api/ngResource/service/$resource
[$route]: http://docs.angularjs.org/api/ngRoute/service/$route
[protractor]: https://github.com/angular/protractor
[jasmine]: http://pivotal.github.com/jasmine/
[karma]: http://karma-runner.github.io
