import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/shared/interfaces/repository.interface';
import { Project } from '../models/project.model';
import { API_URL, PERMISSION } from 'src/app/core/constants/app.constants';

@Injectable()
export class ProjectService implements Repository<Project> {
  constructor(private http: HttpClient) {}

  add(project: Project, permission: string) {
    return this.http.post<Project>(`${API_URL}/projects`, project, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  update(project: Project, permission: string) {
    return this.http.put<Project>(
      `${API_URL}/projects/${project.id}`,
      project,
      {
        context: new HttpContext().set(PERMISSION, permission),
      }
    );
  }

  delete(id: number, permission: string) {
    return this.http.delete<number>(`${API_URL}/projects/${id}`, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }

  getProjects(permission: string) {
    return this.http.get<Project[]>(`${API_URL}/projects`, {
      context: new HttpContext().set(PERMISSION, permission),
    });
  }
}
