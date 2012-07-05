class EmployeesController < ApplicationController
  def index

  end

  def create
    new_employee = Employee.new(params[:employee])
    if new_employee.save
      respond_to do |format|
        format.html  { redirect_to :back}
        format.js
      end
    else
      redirect_to :back
    end
  end

  def new

  end

  def edit

  end

  def show

  end

  def update
    emp = Employee.find_by_id(params[:id])
    emp.first_name = params[:page][:first_name]
    emp.surname = params[:page][:surname]
    emp.date_of_birth = params[:page][:date_of_birth]
    emp.salary = params[:page][:salary]
    emp.save
    respond_to do |format|
      format.html  { redirect_to :back}
    end
	
  end

  def destroy
     Employee.find_by_id(params[:id]).delete
     respond_to do |format|
       format.html  { redirect_to :back}
       end
	   
  end

  def start_edit

  end

  def table
	respond_to do |format|
		format.html { render :json => Employee.all}
		format.csv { send_data Employee.to_csv, :type => 'text/csv; charset=iso-8859-1; header=present', :disposition => "attachment; filename=employees.csv"}
	end
  end
end
