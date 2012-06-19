namespace :db do
  desc "Fill database with sample data"
  task :populate => :environment do
    Rake::Task['db:reset'].invoke
    make_employees
  end
end

def make_employees
  99.times do |n|
    first_name  = Faker::Name.first_name
    surname = Faker::Name.last_name
    salary = 500000 + (Random.rand(50000)*10)
    date_of_birth = time_rand Time.local(1960, 1, 1), Time.local(1993, 1, 1)
    Employee.create!(:first_name => first_name,
                     :surname => surname,
                     :salary => salary,
                     :date_of_birth => date_of_birth)
    end
end

def time_rand from = 0.0, to = Time.now
  Time.at(from + rand * (to.to_f - from.to_f))
end
