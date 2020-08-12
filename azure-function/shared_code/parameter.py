import azure.functions as func


def get_param(req: func.HttpRequest, param: str):

    param_value = req.params.get(param)
    if not param_value:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            param_value = req_body.get(param)

    return param_value
