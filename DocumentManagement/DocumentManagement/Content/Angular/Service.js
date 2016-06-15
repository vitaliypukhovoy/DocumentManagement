app.service('MyService', function ($http) {
  
    this.getAll= function () {    
        return $http.get('/Home/GetAll')
            .then(function (response) {
            return response;
        });      
    };
    this.EditComp = function (IdCompany) {
        return $http(
             {
                 method: "POST",
                 url: '/Home/GetCompany',
                 params: {
                     IdCompany: JSON.stringify(IdCompany)
                 }
             }).then(function (response) {
                 return response;
             });
    }

    this.UpdateComp = function (company) {
        return $http({
            method: "POST",
            url: '/Home/UpdateCompany',
            data: JSON.stringify(company),
            DataType: 'json'
        }).then(function (response) {
            return response;
        });
    }

    this.AddComp = function (company) {
        return $http({
            method: "POST",
            url: '/Home/AddCompany',
            data: JSON.stringify(company),
            DataType: 'json'
        }).then(function (response) {
            return response;
        });
    }

    this.RemoveComp = function (company)
    {
        return $http({
            method: "POST",
            url: '/Home/RemoveCompany',
            data: JSON.stringify(company),
            DataType: 'json'
        }).then(function (response) {
            return response;
        });
    }
         
 
 
  this.data= {
        async: function () {
            return $http.get('/Home/GetAll');  
        }
    };

});

app.service('DepartmentService', function ($http) {

    this.getAll = function () {
        return $http.get('/Department/GetAll')
            .then(function (response) {
                return response;
            });
    };

    this.getComAll = function () {
        return $http.get('/Home/GetAll')
            .then(function (response) {
                return response;
            });
    };

    this.EditDep = function (IdDepartment) {
        return $http(
             {
                 method: "POST",
                 url: '/Department/GetDepartment',
                 params: {
                     IdDepartment: JSON.stringify(IdDepartment)
                 }
             }).then(function (response) {
                 return response;
             });
    }

    this.UpdateDep = function (department) {
        return $http({
            method: "POST",
            url: '/Department/UpdateDepartment',
            data: JSON.stringify(department),
            DataType: 'json'
        }).then(function (response) {
            return response;
        });
    }

    this.AddDep = function (department) {
        return $http({
            method: "POST",
            url: '/Department/AddDepartment',
            data: JSON.stringify(department),           
            DataType: 'json'
        }).then(function (response) {
            return response;
        });
    }

    this.RemoveDep = function (department) {
        return $http({
            method: "POST",
            url: '/Department/RemoveDepartment',
            data: JSON.stringify(department),
            DataType: 'json'
        }).then(function (response) {
            return response;
        });
    }

    this.data = {
        async: function () {
            return $http.get('/Department/GetAll');
        }
    };

    this.getMan = function () {
        return $http.get('/Account/GetManager')
            .then(function (response) {
                return response;
            });
    };

});

app.service('EmployeeService', function ($http) {

    this.getAll = function () {
        return $http.get('/Emp/GetAll')
            .then(function (response) {
                return response;
            });
    };

    //this.getComAll = function () {
    //    return $http.get('/Home/GetAll')
    //        .then(function (response) {
    //            return response;
    //        });
    //};

    //this.EditDep = function (IdDepartment) {
    //    return $http(
    //         {
    //             method: "POST",
    //             url: '/Department/GetDepartment',
    //             params: {
    //                 IdDepartment: JSON.stringify(IdDepartment)
    //             }
    //         }).then(function (response) {
    //             return response;
    //         });
    //}

    //this.UpdateDep = function (department) {
    //    return $http({
    //        method: "POST",
    //        url: '/Department/UpdateDepartment',
    //        data: JSON.stringify(department),
    //        DataType: 'json'
    //    }).then(function (response) {
    //        return response;
    //    });
    //}

    //this.AddDep = function (department) {
    //    return $http({
    //        method: "POST",
    //        url: '/Department/AddDepartment',
    //        data: JSON.stringify(department),
    //        DataType: 'json'
    //    }).then(function (response) {
    //        return response;
    //    });
    //}

    //this.RemoveDep = function (department) {
    //    return $http({
    //        method: "POST",
    //        url: '/Department/RemoveDepartment',
    //        data: JSON.stringify(department),
    //        DataType: 'json'
    //    }).then(function (response) {
    //        return response;
    //    });
    //}
});

app.service('DocumentService', function ($http) {

    this.getAll = function () {
        return $http.get('/document/GetAll')
            .then(function (response) {
                return response;
            });
    };
  }
);

app.service('RegisterService', function ($http) {



    this.setUser = function (reg) {
        return $http({
            method: "POST",
            url: '/Account/Register',
            data: JSON.stringify(reg),
            DataType: 'json'
        }).then(function (response) {
            return response;
        });
    };    
});