"use strict";var app=angular.module("mydrawingsApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.bootstrap","underscore","kinetic","formAutofillFix","resize","vr.directives.slider","notifications"]);app.config(["$routeProvider","$httpProvider",function(a,b){b.defaults.withCredentials=!0,a.when("/logga-in",{templateUrl:"views/login.html",controller:"AuthCtrl as auth"}).when("/registrera",{templateUrl:"views/registrera.html",controller:"AuthCtrl as auth"}).when("/studio",{templateUrl:"views/studio.html",controller:"StudioCtrl",resolve:{images:["DrawingService","$route",function(a){return a.getOwn().then(function(a){return a.data.drawings})}]}}).when("/galleri",{templateUrl:"views/galleri.html",controller:"GalleriCtrl",resolve:{images:["DrawingService","$route",function(a){return a.get().then(function(a){return a.data.drawings})}]}}).when("/bild/:drawingId",{templateUrl:"views/viewdrawing.html",controller:"ViewdrawingCtrl",resolve:{load:["DrawingService","$route",function(a,b){return a.load(b.current.params.drawingId).then(function(a){return a.data})}]}}).when("/bild/editera/:drawingId",{templateUrl:"views/editdrawing.html",controller:"EditdrawingCtrl",resolve:{load:["DrawingService","$route",function(a,b){return a.load(b.current.params.drawingId).then(function(a){return a.data})}]}}).otherwise({redirectTo:"/galleri"})}]),angular.module("mydrawingsApp").controller("StudioCtrl",["images","$scope","$http","$route","$location","DrawingService","Notifications",function(a,b,c,d,e,f,g){b.images=a,b.remove=function(a,b){f.remove(b,function(a){d.reload(),g.sendMessage(a.flash)})},b.create=function(){f.create(function(a){e.path("/bild/editera/"+a.id)})}}]),function(){angular.module("kinetic",[]).directive("stage",["$rootScope",function(a){return{restrict:"EA",scope:{maxWidth:"@width",maxHeight:"@height"},link:function(b,c,d){function e(){var a=40,b=(window.innerWidth-a)/h;j.stage.setAttr("scaleX",b),j.stage.setAttr("scaleY",b),j.stage.setAttr("width",h*b),j.stage.setAttr("height",i*b),j.stage.draw()}function f(){j.stage.setAttr("scaleX",1),j.stage.setAttr("scaleY",1),j.stage.setAttr("width",h),j.stage.setAttr("height",i),j.stage.draw()}var g=d.id;g||(g=Math.random().toString(36).substring(8),c.attr("id",g));var h=b.maxWidth||800,i=b.maxHeight||600,j={stage:new Kinetic.Stage({container:g,width:h,height:i})};b.kinetic=j;var k=function(){window.innerWidth<h?e():f()};b.$on("resize::resize",function(){k()}),k(),a.$broadcast("KINETIC:READY",j.stage)}}}])}(),angular.module("mydrawingsApp").controller("HeaderCtrl",["$scope","$location","AuthenticationService",function(a,b,c){this.collapse=!1,this.toggle=function(){this.collapse=!this.collapse},this.logout=function(){c.logout().success(function(){b.path("/")})},this.isLoggedIn=function(){return c.isLoggedIn()},this.showLogIn=function(){return!this.isLoggedIn()&&"logga-in"!==b.path().substring(1)},this.menuClass=function(a){var c=b.path().substring(1);return a===c?"active":""}}]),angular.module("mydrawingsApp").controller("GalleriCtrl",["images","$scope",function(a,b){b.images=a}]),angular.module("mydrawingsApp").service("FlashService",["$rootScope",function(a){return{show:function(b){a.flash=b},clear:function(){a.flash=""}}}]),angular.module("mydrawingsApp").service("SessionService",function(){return{get:function(a){return sessionStorage.getItem(a)},set:function(a,b){return sessionStorage.setItem(a,b)},unset:function(a){return sessionStorage.removeItem(a)}}}),angular.module("mydrawingsApp").service("Indexservice",function(){return{backendUrl:function(a){return"http://lit-stream-9633.herokuapp.com/"+a}}}),angular.module("mydrawingsApp").service("AuthenticationService",["$http","$sanitize","SessionService","FlashService","Indexservice","CSRF_TOKEN",function(a,b,c,d,e,f){var g=function(){c.set("authenticated",!0)},h=function(){c.unset("authenticated")},i=function(a){d.show(a.flash)},j=function(a){d.show(a.flash)},k=function(a){return{email:b(a.email),password:b(a.password),csrf_token:f}};return{login:function(b){var c=a.post(e.backendUrl("auth/login"),k(b));return c.success(g),c.success(d.clear),c.error(i),c},register:function(b){var c=a.post(e.backendUrl("auth/register"),k(b));return c.error(j),c.success(d.clear),c},logout:function(){var b=a.get(e.backendUrl("auth/logout"));return b.success(h),b},isLoggedIn:function(){return c.get("authenticated")}}}]),angular.module("mydrawingsApp").controller("AuthCtrl",["$scope","$location","Notifications","AuthenticationService",function(a,b,c,d){this.credentials={};var e=this;this.login=function(){d.login(e.credentials).success(function(){b.path("/studio")})},this.register=function(){d.register(e.credentials).success(function(a){b.path("/login"),c.sendMessage(a.flash)})}}]),function(){var a=angular.injector(["ng"]);a.invoke(["$http","$rootScope",function(a,b){b.$apply(function(){a.get("http://lit-stream-9633.herokuapp.com/auth/csrf_token").then(function(a){angular.module("mydrawingsApp").constant("CSRF_TOKEN",a.data.csrf_token),angular.bootstrap(document,["mydrawingsApp"])})})}])}(),angular.module("mydrawingsApp").run(["$rootScope","$location","AuthenticationService","FlashService","_",function(a,b,c,d,e){var f=["/studio","/bild/editera"];a.$on("$routeChangeStart",function(){var a=!1;e.each(f,function(c){b.path().indexOf(c)>-1&&(a=!0)}),a&&!c.isLoggedIn()&&(b.path("/"),d.show("Please log in to continue."))})}]),angular.module("mydrawingsApp").controller("ViewdrawingCtrl",["$scope","$rootScope","Drawdata",function(a,b,c){var d=this;d.kinObjArr=[];var e=function(a){return a/d.stage.getScale().x},f=function(a){return a/d.stage.getScale().y};d.drawOne=function(a){var b;b="rectangle"===c.getObjects()[a].shape?new Kinetic.Rect({x:0,y:0,width:50,height:50,fill:c.getObjects()[a].color}):new Kinetic.Star({x:0,y:0,numPoints:5,innerRadius:40,outerRadius:70,fill:c.getObjects()[a].color}),b.orgTime=c.getObjects()[a].time||0,d.layer.add(b),d.kinObjArr[a]=b;var g=2e3,h=e(d.stage.width()/2)-b.getWidth()/2,i=f(d.stage.height()/2)-b.getHeight()/2;return d.kinObjArr[a].animation=new Kinetic.Animation(function(e){c.getObjects()[a].time=e.time+b.orgTime;var f=c.getObjects()[a].amplitudeX*Math.sin(2*c.getObjects()[a].time*Math.PI/g)+h,j=c.getObjects()[a].amplitudeY*Math.sin(2*c.getObjects()[a].time*Math.PI/g)+i;d.kinObjArr[a].setX(f),d.kinObjArr[a].setY(j)},d.layer),d.kinObjArr[a].animation.start(),b},d.draw=function(){for(var a=0,b=c.getObjects().length;b>a;a++)d.currentShape=d.drawOne(a)},d.reDrawLatest=function(){d.currentShape.animation&&d.currentShape.animation.stop(),d.currentShape.remove(),d.currentShape=d.drawOne(c.getObjects().length-1)},a.$on("DRAWING:UPDATE",function(){d.reDrawLatest()}),a.$on("DRAWING:ADD",function(){d.currentShape=d.drawOne(c.getObjects().length-1)}),a.$on("KINETIC:READY",function(a,b){d.layer=new Kinetic.Layer,d.stage=b,d.stage.add(d.layer),d.draw()}),b.$on("$routeChangeStart",function(){for(var a=0,b=d.kinObjArr.length;b>a;a++)d.kinObjArr[a].animation&&d.kinObjArr[a].animation.stop();c.reset(),d.kinObjArr=[]})}]),angular.module("mydrawingsApp").service("Drawdata",["_",function(a){var b={};return{getObjects:function(){return b.drawing_objects},get:function(){return b},getLatestObject:function(){return b.drawing_objects[b.drawing_objects.length-1]},load:function(a){b=a},setParam:function(a,c){b[a]=c},setObject:function(c,d){b.drawing_objects[b.drawing_objects.length-1]=d?a.defaults(a.clone(c),b.drawing_objects[b.drawing_objects.length-1]):a.clone(c)},addObject:function(c){b.drawing_objects[b.drawing_objects.length]=a(c).clone()},reset:function(){b.drawing_objects.length=0}}}]),angular.module("mydrawingsApp").service("DrawingService",["$http","$location","Drawdata","Indexservice",function(a,b,c,d){return{save:function(b){return a.post(d.backendUrl("drawings/save/"+c.get().id),c.get()).success(b)},load:function(b){return a.get(d.backendUrl("drawings/drawing/"+b)).success(function(a){c.load(a[0])})},create:function(b){return a.post(d.backendUrl("drawings/create")).success(b)},remove:function(b,c){return a.post(d.backendUrl("drawings/remove/"+b)).success(c)},get:function(){return a.get(d.backendUrl("drawings/index"))},getOwn:function(){return a.get(d.backendUrl("user/drawings"))}}}]),function(){angular.module("formAutofillFix",[]).directive("formAutofillFix",function(){return function(a,b,c){b.prop("method","POST"),c.ngSubmit&&setTimeout(function(){b.unbind("submit").submit(function(d){d.preventDefault(),b.find("input, textarea, select").trigger("input").trigger("change").trigger("keydown"),a.$apply(c.ngSubmit)})},0)}})}(),function(){angular.module("resize",[]).directive("resize",["$window","_",function(a,b){return{link:function(c){var d=b.debounce(function(){c.$broadcast("resize::resize")},500);angular.element(a).on("resize",d)}}}])}(),angular.module("mydrawingsApp").controller("EditdrawingCtrl",["$scope","Drawdata","DrawingService","Notifications",function(a,b,c,d){a.drawingData={amplitudeX:150,amplitudeY:150,color:"#ff00ff",shape:"rectangle"},a.data={name:b.get().name,r:250,g:0,b:250};var e=this;a.hasChanges=!1;var f=function(a){var b=a.toString(16);return 1===b.length?"0"+b:b},g=function(a,b,c){return"#"+f(a)+f(b)+f(c)};a.updateColor=function(){a.drawingData.color=g(a.data.r,a.data.g,a.data.b),a.update(!0)},a.fireResizeEvent=function(){a.$broadcast("refreshSlider")},a.changeName=function(){b.setParam("name",a.data.name),a.hasChanges=!0},a.update=function(c){0!==b.getObjects().length&&(b.setObject(a.drawingData,b.getLatestObject),c&&a.$broadcast("DRAWING:UPDATE"),a.hasChanges=!0)},a.addObject=function(){b.addObject(a.drawingData),a.$broadcast("DRAWING:ADD"),a.hasChanges=!0},a.saveDrawing=function(){e.stage.toDataURL({callback:function(a){b.setParam("img_thumb",a),c.save(function(a){d.sendMessage(a.flash)})}}),a.hasChanges=!1},a.$on("KINETIC:READY",function(a,b){e.stage=b})}]);