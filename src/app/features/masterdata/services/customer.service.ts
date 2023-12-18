import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/shared/interfaces/repository.interface';
import { Customer } from '../models/customer.model';
import { API_URL, PERMISSION } from 'src/app/core/constants/app.constants';

@Injectable()
export class CustomerService implements Repository<Customer> {
  constructor(private http: HttpClient) {}

  add(customer: Customer, permission: string) {
    return this.http.post<Customer>(`${API_URL}/customers`, customer, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  update(customer: Customer, permission: string) {
    return this.http.put<Customer>(
      `${API_URL}/customers/${customer.id}`,
      customer,
      {
        context: new HttpContext().set(PERMISSION, permission),
      }
    );
  }

  delete(id: number, permission: string) {
    return this.http.delete<number>(`${API_URL}/customers/${id}`, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  getCustomers(permission: string) {
    return this.http.get<Customer[]>(`${API_URL}/customers`, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }
}
