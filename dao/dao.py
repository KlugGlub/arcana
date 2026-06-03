from abc import ABC, abstractmethod
class DAO(ABC):
    @abstractmethod
    def criar(self, obj):
        pass

    @abstractmethod
    def ler(self, id):
        pass

    @abstractmethod
    def atualizar(self, obj):
        pass

    @abstractmethod
    def deletar(self, id):
        pass