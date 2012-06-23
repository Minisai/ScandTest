class EmployeesController < ApplicationController
  def index

  end

  def create
    new_employee = Employee.new(params[:employee])
    if new_employee.save
      respond_to do |format|
        format.html  { redirect_to :back}
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
    render :json => Employee.all
  end
end
