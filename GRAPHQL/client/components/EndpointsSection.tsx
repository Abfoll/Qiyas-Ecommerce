"use client";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

type User = {
  id: string;
  name: string;
  email: string;
  username: string;
};

type GetUsersData = {
  users: {
    data: User[];
  };
};

const GET_USERS = gql`
  query GetUsers {
    users {
      data {
        id
        name
        email
        username
      }
    }
  }
`;

export default function EndpointsSection() {
  const { loading, error, data } = useQuery<GetUsersData>(GET_USERS);

  return (
    <section className="px-8 py-16 border-t border-slate-200">
      <h2 className="text-2xl font-bold mb-6">Fetched Endpoint Data</h2>

      {loading && <p className="text-slate-500">Loading data…</p>}

      {error && (
        <p className="text-red-500">
          Error fetching data: {error.message}
        </p>
      )}

      {data && (
        <div className="grid md:grid-cols-3 gap-4">
          {data.users.data.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm"
            >
              <p className="text-xs text-slate-500 mb-2">ID: {user.id}</p>
              <h3 className="font-semibold mb-1">{user.name}</h3>
              <p className="text-sm text-slate-500">@{user.username}</p>
              <p className="text-sm text-slate-500">{user.email}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}