function Formulario({botao, typingEvent, insert, obj, cancelar, remover, alterar}){
    return(
        <form>
            <input type="text" value={obj.nome} placeholder="Name" className="form-control" onChange={typingEvent} name="nome"/>
            <input type="text" value={obj.marca} placeholder="Marca" className="form-control" onChange={typingEvent} name="marca"/>
            
            {
                botao?
                    <input type="button" value='Cadastrar' className="btn btn-primary" onClick={insert}/>
                :
                <div>
                    <input type="button" value='Alterar' className="btn btn-warning" onClick={alterar}/>
                    <input type="button" value='Remover' className="btn btn-danger" onClick={remover}/>
                    <input type="button" value='Cancelar' className="btn btn-secondary" onClick={cancelar}/>
                </div>
            }
            
            
        </form>
    )
}

export default Formulario;