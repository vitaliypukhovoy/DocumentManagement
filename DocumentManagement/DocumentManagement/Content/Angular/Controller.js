app.controller('MyControl', function ($rootScope, $scope,$location, $filter, MyService){
 
    $scope.divCompany = false;
    $scope.ShowModal = false;
    GetAllCompanies();
    function GetAllCompanies() {        
        MyService.getAll().then(function (response) {
            $scope.companies = response.data;
        }, function () { alert("Error in getting records") }
        );
    }
   
        $scope.editCompany = function (company)
        {              
            $scope.ShowModal = !$scope.ShowModal;
            MyService.EditComp(company.IdCompany).then(function (response) {
            $scope.company = company.data;
            $scope.Id_Company = response.data.IdCompany;
            $scope.Name_Company = response.data.NameCompany;
            $scope.Action = "Update";               
            });
        }

        $scope.AddCompany = function ()
        {
            ClearFields();
            $scope.ShowModal = !$scope.ShowModal;
            $scope.Action = "Add";
        }
        $scope.deleteCompany = function (company) {
            var company = {
                IdCompany: company.IdCompany,
                NameCompany: company.NameCompany
            };
            MyService.RemoveComp(company).then(function (response) {
                GetAllCompanies();
                showModal(response.data);
            }, function () { alert("Error in getting records") }
          );
        }

        $scope.UpdateAddCompany = function ()
        {
            var company ={ 
                IdCompany: $scope.Id_Company,
                NameCompany: $scope.Name_Company 
            };
            if ($scope.Action == "Update") {
                MyService.UpdateComp(company).then(function (response) {
                    GetAllCompanies();
                    setTimeout(showModal, 100, response.data);
                    $scope.ShowModal = !$scope.ShowModal;
                },function (){ alert("Error in getting records") }
             );               
            }
            else 
            {
                MyService.AddComp(company).then(function (response) {
                    GetAllCompanies();
                    setTimeout(showModal, 100, response.data);
                    $scope.ShowModal = !$scope.ShowModal;
                },function (){ alert("Error in getting records") }
             );                                   
            }
        };

        function showModal(data) {
            $scope.ShowModal2 = !$scope.ShowModal2;
            $scope.Action2 = data;
        }
        $scope.Ok = function () {
            $scope.ShowModal2 = !$scope.ShowModal2;
        }

        function ClearFields()
        {
            $scope.Id_Company = "";
            $scope.Name_Company = "";
        }
});

app.controller('Department', function ($rootScope, $scope, $location, $filter, DepartmentService) {
   
 
    $scope.ShowModal = false;
    $scope.ShowModal2 = false;
    GetAllDepartments();
    function GetAllDepartments() {
        DepartmentService.getAll().then(function (response) {
            $scope.departments = response.data;
        }, function () { alert("Error in getting records") }
        );
    }

    $scope.editDepartment = function (dep) {
        $scope.ShowModal = !$scope.ShowModal;
        DepartmentService.EditDep(dep.IdDepartment).then(function (response) {
            $scope.department = dep.data;
            $scope.Id_Department = response.data.IdDepartment;
            $scope.Name_Department = response.data.DepartmentName;
            $scope.Companies = [{ value: response.data.Company, option: response.data.IdCompany }];
            $scope.selected = $scope.Companies[0];
            $scope.Action = "Update";
        });
    }

    $scope.AddDepartment = function () {
        ClearFields();
        DepartmentService.getComAll().then(function (response) {
            $scope.ShowModal = !$scope.ShowModal;
            $scope.Companies = ArrayCompany(response.data);
            $scope.Action = "Add";
        }, function () {
            $scope.ShowModal2 = !$scope.ShowModal2;
            alert("Error in getting records")
        }
        );        
    }

    function ArrayCompany(array)
    {
        var arr = [];
        $.each(array, function (index, val) {
            arr.push({ value: val.NameCompany, option: val.IdCompany });
        });
        return arr;
    }

    $scope.deleteDepartment = function (dep) {
        var department = {
            IdDepartment: dep.IdDepartment,
            DepartmentName: dep.NameDepartment
        };
        DepartmentService.RemoveDep(department).then(function (response) {
            GetAllDepartments();
            showModal(response.data);
        }, function () { alert("Error in getting records") }
      );
    }

    $scope.UpdateAddDepartment = function () {
        var department = {
            IdDepartment: $scope.Id_Department,
            DepartmentName: $scope.Name_Department,
            IdCompany: $scope.selected.option
        };
         
        if ($scope.Action == "Update") {
            DepartmentService.UpdateDep(department).then(function (response) {
                GetAllDepartments();
                $scope.ShowModal = !$scope.ShowModal;
                setTimeout(showModal, 100, response.data);
            }, function () { alert("Error in getting records") }
         );
        }
        else {
            DepartmentService.AddDep(department).then(function (response) {
                GetAllDepartments();
                $scope.ShowModal = !$scope.ShowModal;
                setTimeout(showModal, 100, response.data);
            }, function () { alert("Error in getting records") }
         );
        }
    };
    function showModal(data)
    {
        $scope.ShowModal2 = !$scope.ShowModal2;
        $scope.Action2 = data;
    }
    $scope.Ok = function ()
    {
        $scope.ShowModal2 = !$scope.ShowModal2;
    }

    function ClearFields() {
        $scope.Id_Department = "";
        $scope.Name_Department = "";
        $scope.Companies = "";
        $scope.Action2 = "";
        $scope.Action = "";
    }

});

app.controller('Employee', function ($rootScope, $scope, $location, $filter, EmployeeService) {


    $scope.ShowModal = false;
    GetAllEmployees();
    function GetAllEmployees() {
        EmployeeService.getAll().then(function (response) {
            $scope.employees = response.data;
        }, function () { alert("Error in getting records") }
        );
    }

   
    function ClearFields() {
        $scope.Id_Department = "";
        $scope.Name_Department = "";
        $scope.Companies = "";
    }

});
app.controller('Document', function ($rootScope, $scope, $location, $filter, DocumentService) {

    $scope.ShowModal = false;
    GetAllDocuments();
    function GetAllDocuments() {
        DocumentService.getAll().then(function (response) {
            $scope.documents = response.data;
        }, function () { alert("Error in getting records") }
        );
    };
} );


app.controller('Admin', function ($rootScope, $scope, $location, $filter, AdminService) {

    $scope.ShowModal = true;
  
});

app.controller('Register', function ( $scope,$log,RegisterService,DepartmentService) {

    $scope.dataHide2 = true;
    GetManager();
    $scope.Action = "Add";
    var depHead;
    var manCom;
    var dep;
    var state;

    $scope.$watch('stuff', function (stuff) {
        if (stuff == 'adm') {
            state = 'adm';
            $scope.dataHide = false;
            $scope.dataHide2 = true;
        }
        else if (stuff == 'man') {
            state = 'man';
            $scope.dataHide = false;
            $scope.dataHide2 = true;
        }
        else if (stuff == 'emp') {
            GetManager();
            state = 'emp';
            $scope.dataHide = true;
            $scope.dataHide2 = false;
        };
    });
    $scope.$watch('selected', function (selected) {
           
        
        console.log(state);
        if (state == 'emp') {
            dep = $scope.selected.option.match(/(^\d*[^;])/)[0];
            manCom = $scope.selected.option.match(/([^;]\d*$)/)[0];
        }
        else {
            dep = $scope.selected.option;
            manCom = undefined;
        }


    });
    function GetManager() {
        DepartmentService.getMan().then(function (response) {
            $scope.Managers = ArrayRegister1(response.data);
        }, function () { alert("Error in getting records") }
     );
    }

    DepartmentService.getAll().then(function (response) {
        $scope.Departments = ArrayRegister(response.data);
    }, function () { alert("Error in getting records") }
     );


    function ArrayRegister1(array) {
        var arr = [];
        $.each(array, function (index, val) {          
            arr.push({ value: val.FirstName + ' '+val.LastName + '-' + val.IdDepartment, option: val.IdDepartment + ';' + val.IdEmployee });
        });    
    return arr;
    };

    function ArrayRegister(array) {
    var arr = [];
    $.each(array, function (index, val) {
        arr.push({ value: val.DepartmentName, option: val.IdDepartment });               
    });
    return arr;
    };
               
   
        $scope.UpdateAddRegister = function () {
            var reg = {
                UserName: $scope.User_Name,
                Password: $scope.Password,
                ConfirmPassword: $scope.Confirm_Password,
                FirstName: $scope.First_Name,
                LastName: $scope.Last_Name,
                IdDepartment: dep,
               // DepartmentHead:  DepHead,
                Manager: manCom
            };
         
            if ($scope.Action == "Add")
            {
                RegisterService.setUser(reg).then(function (response) {
                    alert(response.data);                   
                }, function () { alert("Error in getting records") }
             );
            }
        }

        });

