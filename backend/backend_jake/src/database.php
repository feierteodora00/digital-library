<?php
/**
 * Connection to the database.
 *
 * Allows for a connection to be made to a database
 *
 * @author Jake Ellerington
 */
class Database
{
    private $dbConnection;

    public function __construct($dbName, $username, $password){
        $this->setDbConnection($dbName, $username, $password);
    }

    private function setDbConnection($dbName, $username, $password){
        try {
            $this->dbConnection = new PDO('mysql:host=localhost;dbname='.$dbName, $username, $password);
            $this->dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Database Connection Error: " . $e->getMessage();
            exit();
        }
    }

    public function executeSQL($sql, $params=[]) {
        $stmt = $this->dbConnection->prepare($sql);
        $stmt->execute($params);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}


