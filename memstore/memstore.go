package memstore

import (
	"errors"

	"github.com/hashicorp/go-memdb"
)

type TestStatus struct {
	Id     string
	Status string
}

type MemoryStore struct {
	DB *memdb.MemDB
}

func NewMemoryDB() (*memdb.MemDB, error) {
	schema := &memdb.DBSchema{
		Tables: map[string]*memdb.TableSchema{
			"teststatus": &memdb.TableSchema{
				Name: "teststatus",
				Indexes: map[string]*memdb.IndexSchema{
					"id": &memdb.IndexSchema{
						Name:    "id",
						Unique:  true,
						Indexer: &memdb.StringFieldIndex{Field: "Id"},
					},
					"status": &memdb.IndexSchema{
						Name:    "status",
						Unique:  false,
						Indexer: &memdb.StringFieldIndex{Field: "Status"},
					},
				},
			},
		},
	}

	db, err := memdb.NewMemDB(schema)
	if err != nil {
		return nil, errors.New("ERROR: Cannot instantiate MemDB - " + err.Error())
	}

	return db, nil
}

func (m *MemoryStore) Add(testId string, status string) error {

	txn := m.DB.Txn(true)

	s := &TestStatus{
		Id:     testId,
		Status: status,
	}

	if err := txn.Insert("teststatus", s); err != nil {
		return err
	}

	txn.Commit()

	return nil
}

func (m *MemoryStore) Get(testId string) (string, error) {
	txn := m.DB.Txn(false)
	defer txn.Abort()

	raw, err := txn.First("teststatus", "id", testId)
	if err != nil {
		return "", err
	}

	return raw.(*TestStatus).Status, nil
}
